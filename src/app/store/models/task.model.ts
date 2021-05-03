export interface Task {
    id: string;
    text: string; //contains either a normal text or base64 data string
    checked: boolean;
    image: boolean; //if task is image, this wil be set to true and task.text would be set to base64 data string
    user: string;
    date?: Date | undefined;
}