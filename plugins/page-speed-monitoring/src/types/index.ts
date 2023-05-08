export interface IPageSpeedPlugin {
    tool: ITool
}

interface IPluginOptions {
    API_KEY: string
}

export interface ITool {
    title: string,
    name: string,
    icon: Object,
    component: Function,
    route: any,
    options: IPluginOptions
}


export default IPageSpeedPlugin
