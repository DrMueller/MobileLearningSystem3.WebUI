export class LearningSession {
    public id: number;
    public factIds: number[];
    public sessionName: string;

    public constructor() {
        this.factIds = [];
    }
}
