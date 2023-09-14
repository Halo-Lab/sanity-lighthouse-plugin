interface IMainInfo {
  date: string
  device: string
  linkReq: string
}

interface IDataHistory {
  desktop: (string | number[])[]
  mobile: (string | number[])[]
}

interface IPerfomanceItem {
  title: string
  score: number
  categories: string[]
}

export interface ITool {
  title: string
  name: string
  icon: Object
  component: Function
  route: any
}

export interface ICategoryItem {
  desktop: IPerfomanceItem[]
  mobile: IPerfomanceItem[]
}

export interface IPluginData {
  mainInfo: IMainInfo
  history: IDataHistory
  categoryList: ICategoryItem[]
}

export interface IPageSpeedPlugin {
  tool: ITool
}
