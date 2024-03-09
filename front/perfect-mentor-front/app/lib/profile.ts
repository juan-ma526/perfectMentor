import { toast } from "sonner";

export const handleUpdateUser = async (age: string, rol: string) => {
  try {
    const response = await fetch("http://localhost:3001/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        age: age,
        rol: rol,
      }),
    });
    const data = await response.json();

    toast.success("Usuario Actualizado, cambios visibles en proximo inicio de sesion");

    return data;
  } catch (error) {
    console.log(error);
    toast.error("Error al actualizar Usuario");
    throw error;
  }
};

export const handleVerifyUser = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/users/verifiedUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({}),
    });

    toast.success("Usuario Verificado");
    return await response.json();
  } catch (error) {
    toast.error("Error al verificar Usuario");
    throw error;
  }

  //return data.message;
};
