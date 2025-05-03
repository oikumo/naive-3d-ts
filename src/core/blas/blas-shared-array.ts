export class SharedArray<T extends RelativeIndexable<number>> {
    length: number = 0;
    ptr: number = 0;
    data: T;

    constructor(ptr: number, data: T, length: number) {
        this.ptr = ptr;
        this.data = data;
        this.length = length;

    }

    info() {
        if(this.data === null) throw Error();
        const message = [];
    
        for (let i = 0; i < this.length; i++) {
            message.push(this.data.at(i));
        }

        return 'data: [' + message.join(', ') + ']';
    }
}
