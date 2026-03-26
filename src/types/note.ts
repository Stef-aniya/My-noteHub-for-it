export interface Note {
  id: string;
  text: string;
  completed: boolean;
}

export interface CreateNote {
  text: string;
}

export interface UpdateNote {
  completed: boolean;
}
