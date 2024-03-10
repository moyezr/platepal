import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types";
export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from("products")
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
        });

      if (error) {
        throw new Error(error.message);
      }

      return newProduct;
    },
    async onSuccess() {
      //@ts-ignore
      await queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, ...update }: Product) {
      const { data, error } = await supabase
        .from("products")
        .update(update)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    async onSuccess(_, { id }) {
      //@ts-ignore
      await queryClient.invalidateQueries(["products"]);
      //@ts-ignore
      await queryClient.invalidateQueries(["product", id]);
    },
    onError(error) {
      console.log(error);
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    async mutationFn(id: string) {
      await supabase.from("products").delete().eq("id", id);
    },

    async onSuccess() {
      //@ts-ignore
      await queryClient.invalidateQueries(["products"]);
    },
  });
};
