export type Todo = {
    id: number;
    title: string;
    completed: boolean;
    category: string;
};

export type TodoState = {
    todos: Todo[];
};