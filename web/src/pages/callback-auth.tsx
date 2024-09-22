import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../libs/axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Loading } from "../components/loading";

export function CallbackAuth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get("code");

  // Early return se não houver código de autenticação
  if (!code) {
    navigate("/login"); // Redireciona para a página de login, ou pode exibir uma mensagem de erro
    return null;
  }

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-token-auth", code], // inclua `code` no queryKey para melhor cache
    queryFn: async () => {
      const response = await API.post("/sessions/github", { code });
      return response.data;
    },
    retry: 0, // Define as tentativas como 0 para evitar tentativas automáticas em caso de falha
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data?.token) {
      Cookies.set("user-token", data.token);
      navigate("/summary");
    }
  }, [isSuccess, data, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return null; // Caso não esteja carregando e não haja código, retorna null.
}
