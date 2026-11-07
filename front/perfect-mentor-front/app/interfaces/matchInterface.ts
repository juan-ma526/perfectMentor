export interface Match {
  _id: string;
  idUser: string;
  idUserDestination: string;
  usernameUser?: string;
  emailUser?: string;
  roleUser?: string;
  usernameDestination?: string;
  emailDestination?: string;
  roleDestination?: string;
  status: string;
  createdAt: string;
}

export interface ChatMessage {
  _id: string;
  matchId: string;
  message: string;
  from: string;
  createdAt: string;
}
