export type IProjectsData = IProjectData[];
export type ITasksData = ITaskData[];
export type ITasksFormatedData = ITaskFormatedData[];
export type IParentId = string;
export type ISuperParentId = string;
export type IResponsibleId = string;
export type IUsersData = IUserData[];

export interface IProjectData {
  id: string;
  title: string;
}

export interface ITaskData {
  id: string;
  title: string;
  status: string;
  parentIds: IParentId[];
  superParentIds: ISuperParentId[];
  responsibleIds: IResponsibleId[];
  createdDate: string;
  updatedDate: string;
  permalink: string;
}

export interface ITaskFormatedData {
  id: string;
  name: string;
  status: string;
  collections: IParentId[] | ISuperParentId[];
  assignees: IResponsibleId[];
  created_at: string;
  updated_at: string;
  ticket_url: string;
}

export interface ITaskUserMerged {
  id: string;
  name: string;
  status: string;
  collections: IParentId[] | ISuperParentId[];
  assignees: IUserData[];
  created_at: string;
  updated_at: string;
  ticket_url: string;
}

export interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  type?: string;
  title: string;
  primaryEmail: string;
}

export interface IData {
  id: string;
  title: string;
  tasks: ITaskUserMerged[];
}
