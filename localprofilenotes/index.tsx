import definePlugin, { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";

// We completely bypass Discord's strict localStorage block by using Vencord's built-in Settings API.
// Vencord uses Electron's native file system to save this directly to your hard drive, which Discord cannot block.
const settings = definePluginSettings({
    titleColor: {
        type: OptionType.STRING,
        default: "var(--header-secondary)",
        description: "CSS color for the LOCAL NOTE title (e.g., var(--header-secondary), #ffffff, red)",
    },
    noteColor: {
        type: OptionType.STRING,
        default: "#ffffff",
        description: "CSS color for the actual note text (e.g., #ffffff)",
    },
    savedNotes: {
        type: OptionType.STRING,
        default: "{}",
        description: "Raw Data for your notes (Do not edit manually!)",
    }
});

function getNotes(): Record<string, string> {
    try { 
        return JSON.parse(settings.store.savedNotes || "{}"); 
    } catch { 
        return {}; 
    }
}

// Map to hold timeouts so we don't save 50 times while you are typing quickly
const saveTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function saveNote(userId: string, note: string) {
    if (saveTimeouts.has(userId)) clearTimeout(saveTimeouts.get(userId)!);
    
    saveTimeouts.set(userId, setTimeout(() => {
        try {
            const notes = getNotes();
            if (!note.trim()) delete notes[userId];
            else notes[userId] = note;
            
            // Updating the Vencord store instantly writes it to the hard drive!
            settings.store.savedNotes = JSON.stringify(notes);
        } catch (e) {
            console.error("[LocalNotes] Failed to save note:", e);
        }
        saveTimeouts.delete(userId);
    }, 400));
}

function identifyProfileScroller(node: HTMLElement): string | null {
    const fiberKey = Object.keys(node).find(k => k.startsWith("__reactFiber$"));
    if (!fiberKey) return null;
    
    let fiber = (node as any)[fiberKey];
    let depth = 0;

    while (fiber && depth < 50) { 
        const props = fiber.memoizedProps;
        if (props) {
            let userId = null;
            if (props.user?.id) userId = props.user.id;
            else if (props.displayedUser?.id) userId = props.displayedUser.id;
            else if (props.displayedProfile?.user?.id) userId = props.displayedProfile.user.id;
            else if (props.userId) userId = props.userId;

            if (userId && /^\d{17,20}$/.test(userId)) return userId;
        }
        fiber = fiber.return;
        depth++;
    }
    return null;
}

let observer: MutationObserver | null = null;

function injectNoteField(scroller: HTMLElement) {
    const userId = identifyProfileScroller(scroller);
    if (!userId) return;

    let container = scroller.querySelector("#vencord-local-note-box") as HTMLElement;

    if (container) {
        if (container.dataset.userId !== userId) {
            container.dataset.userId = userId;
            const textarea = container.querySelector("textarea")!;
            textarea.value = getNotes()[userId] || "";
        }
        
        // Dynamically apply settings colors to an existing node
        const h3 = container.querySelector("h3");
        if (h3) h3.style.color = settings.store.titleColor;
        const textarea = container.querySelector("textarea");
        if (textarea) textarea.style.color = settings.store.noteColor;
        
        return; 
    }

    container = document.createElement("div");
    container.id = "vencord-local-note-box";
    container.dataset.userId = userId;
    container.style.padding = "16px";
    container.style.marginTop = "8px"; 
    container.style.flexShrink = "0";  
    container.style.borderTop = "1px solid var(--background-modifier-accent)";
    
    container.innerHTML = `
        <h3 style="color: ${settings.store.titleColor}; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; font-weight: bold; font-family: var(--font-display);">
            Local Note
        </h3>
        <textarea placeholder="Click to add a local note..." style="width: 100%; min-height: 80px; background: var(--input-background); color: ${settings.store.noteColor}; border: none; border-radius: 4px; padding: 8px; resize: vertical; box-sizing: border-box; font-family: var(--font-primary); font-size: 14px;"></textarea>
    `;

    const textarea = container.querySelector("textarea")!;
    textarea.value = getNotes()[userId] || "";
    
    textarea.addEventListener("input", (e) => {
        const currentUserId = container.dataset.userId;
        if (currentUserId) {
            saveNote(currentUserId, (e.target as HTMLTextAreaElement).value);
        }
    });

    scroller.appendChild(container);
}

export default definePlugin({
    name: "LocalProfileNotes",
    description: "Adds a local notes field to the user profile sidebar in DMs.",
    authors: [{ name: "Gemini", id: 0n }],
    settings,

    start() {
        observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                for (const n of Array.from(m.addedNodes)) {
                    if (n instanceof HTMLElement) {
                        if (n.matches('[class*="scrollerBase_"]')) injectNoteField(n);
                        
                        const scrollers = n.querySelectorAll('[class*="scrollerBase_"]');
                        for (const scroller of Array.from(scrollers)) {
                            injectNoteField(scroller as HTMLElement);
                        }
                    }
                }
                
                if (m.target instanceof HTMLElement) {
                    const scroller = m.target.closest('[class*="scrollerBase_"]');
                    if (scroller) injectNoteField(scroller as HTMLElement);
                }
            }
        });
        
        const appMount = document.getElementById("app-mount") || document.body;
        if (appMount) {
            observer.observe(appMount, { childList: true, subtree: true });
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                const app = document.getElementById("app-mount") || document.body;
                observer!.observe(app, { childList: true, subtree: true });
            });
        }

        document.querySelectorAll('[class*="scrollerBase_"]').forEach(scroller => {
            injectNoteField(scroller as HTMLElement);
        });
    },

    stop() {
        if (observer) observer.disconnect();
        document.querySelectorAll("#vencord-local-note-box").forEach(box => box.remove());
    }
});