export type taskStatistic = {
    tasks: number;
    completed: number;
    deleted: number;
    edited: number;
}

export type taskStatisticState = {
    statistic: taskStatistic
}