export {}

class List<T> {
    private contents: Array<T>;

    constructor() {
        this.contents = [];
    }

    size(): number {
        return this.contents.length;
    }

    add(item: T): void {
        this.contents.push(item);
    }

    get(index: number): T {
        return this.contents[index];
    }

    removeByValue(target: T): void {
        this.contents = this.contents.filter(item => item !== target);
    }

    removeByIndex(index: number): void {
        this.removeByValue(this.get(index));
    }

}