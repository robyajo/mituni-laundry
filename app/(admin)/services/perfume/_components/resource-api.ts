import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;
const apiUrl = `${API_URL}/api/perfume`;
export const usePerfumeData = () => {
    const { data: session } = useSession();
    return useQuery<any>({
      queryKey: ["perfume"],
      queryFn: async () => {
        const response = await axios.post(
          apiUrl,
          {
            branch_id: session?.data?.outlet_id_active,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-mituni-key": `${MITUNI_API_KEY}`,
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        return response.data;
      },
      enabled: !!session?.accessToken && !!session?.data?.outlet_id_active,
    });
  };
export const usePerfumeDataById = (id: string | number) => {
    const { data: session } = useSession();
    return useQuery<any>({
      queryKey: ["perfume-id", id],
      queryFn: async () => {
        const response = await axios.post(
          apiUrl ,
          {
            branch_id: session?.data?.outlet_id_active,
            id: id,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-mituni-key": `${MITUNI_API_KEY}`,
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        return response.data;
      },
      enabled: !!session?.accessToken && !!session?.data?.outlet_id_active,
    });
  };
export const usePerfumeDeleteDataById = (id: string | number) => {
    const { data: session } = useSession();
    return useQuery<any>({
      queryKey: ["perfume-delete-id", id],
      queryFn: async () => {
        const response = await axios.post(
          apiUrl + "/delete" ,
          {
            branch_id: session?.data?.outlet_id_active,
            id: id,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-mituni-key": `${MITUNI_API_KEY}`,
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        return response.data;
      },
      enabled: !!session?.accessToken && !!session?.data?.outlet_id_active,
    });
  };