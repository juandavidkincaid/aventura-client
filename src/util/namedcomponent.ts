import { FC } from "react";

// NamedComponent for react development and type definition

const NamedComponent = <P={}>(displayName: string, component: FC<P>)=>{
    component.displayName = displayName;
    return component;
}

export {
    NamedComponent,
    NamedComponent as NC
}