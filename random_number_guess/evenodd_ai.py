import joblib as pd
import pandas as jl
def even_odd_ai(number):
    model = pd.load("even_odd_model_v4.pkl")  
    prediction = model.predict(jl.DataFrame({"Number": [number]}).values)
    return prediction[0]