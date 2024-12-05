#include<stdio.h>
#include <time.h>
#include <stdlib.h>

int main()
{   
    int lb;
    int ub;
    printf("Генератор случайных чисел.\n");
    printf("Введите начальный номер диапазона: ");
    scanf("%d", &lb);
    printf("Введите конечный номер диапазона: ");
    scanf("%d", &ub);
    srand(time(NULL));
    printf("%d ", (rand() % (ub - lb + 1)) + lb );
    printf("\n");
    printf("\nСпонсор: иМолоко");
    return 0;
}