export interface AuthenticatedResponse {
  accessToken: string;
  refreshToken: string;
  data: any[];
  ok: boolean;
}
