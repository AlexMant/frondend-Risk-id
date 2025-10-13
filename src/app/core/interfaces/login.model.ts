export interface LoginModel {
  email: string;
  password: string;
}
export interface ForgotModel {
  
  email: string;
}
export interface ChangeModel {
  vpassword: string;
  vpassword_tmp: string;
}

export interface RegistroModel {
  VnombreUsuario: string;
  VprimerApellido: string;
  segundoapellido: string;
  Vmail: string;
  password: string;
  vrut: string;
  vtelefono: string;
}