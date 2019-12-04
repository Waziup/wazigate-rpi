
declare class  Query {
    index(): number;
    on(event: string, cb: ((event: Event) => void), data?: any) : Query;
    once(event: string, cb: ((event: Event) => void), data?: any) : Query;
    off(event: string, cb: ((event: Event) => void), data?: any) : Query;
    append(child: Node|Query) : Query;
    addClass(cls: string) : Query;
    removeClass(cls: string) : Query;
    toggleClass(cls: string) : Query;
}
declare var $: {
    (init: Node|string|Query): Query;

    createNS(ns:string, elm:string, props?:object, children?:Node[]): Element;
    create(elm:string, props?:object, children?:Node[]): HTMLElement;
    box(props?:object, children?:Node[]): HTMLElement;
    style(decl:object): string;
    text(str: string): Text;

    window: Query;
    body: Query;
    head: Query;
}