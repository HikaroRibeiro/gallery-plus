import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Photo } from "../models/photo";
import { api, fetcher } from "../../../helpers/api";
import type { PhotoNewFormSchema } from "../schemas";
import { toast } from "sonner";
import usePhotoAlbums from "./use-photo-albums";
import { useNavigate } from "react-router";

interface PhotoDetailResponse extends Photo {
    nextPhotoId?: string;
    previousPhotoId?: string;
}

export default function usePhoto(id?: string) {

    const navigate = useNavigate();

    const {data, isLoading} = useQuery<PhotoDetailResponse>({
        queryKey: ["photo", id],
        queryFn: () => fetcher(`/photos/${id}`),
        // Verifica se existe o valor, se existir assume true, caso contrário false.
        enabled: !!id
    });

    const queryClient = useQueryClient();
    const {managePhotoOnAlbum} = usePhotoAlbums();

    async function createPhoto(payload: PhotoNewFormSchema) {

        try {
            const {data: photo} = await api.post<Photo>("/photos", {
                title: payload.title
            });

            await api.post(`/photos/${photo.id}/image`, {
                file: payload.file[0],
            },{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            if(payload.albumsIds && payload.albumsIds.length > 0) {
                await managePhotoOnAlbum(photo.id, payload.albumsIds);
                }
            
            queryClient.invalidateQueries({queryKey: ["albums"]});
            queryClient.invalidateQueries({queryKey: ["photos"]});

            toast.success("Foto criada com sucesso!", {
                description: "Sua foto foi criada com sucesso e já está disponível na galeria.",
            })

        } catch (error) {
            toast.error("Erro ao criar a foto.", {
                description: "Não foi possível criar a foto. Por favor, tente novamente."
            })
            throw error;
        }
    }

    async function deletePhoto(photoId: string) {
        try{
            await api.delete(`/photos/${photoId}`);
            queryClient.invalidateQueries({queryKey: ["albums"]});
            queryClient.invalidateQueries({queryKey: ["photos"]});
            navigate("/");
            toast.success("Foto apagada com sucesso!", {
                description: "Sua foto foi apagada com sucesso e não está mais disponível na galeria.",
            })
        } catch(error) {
            toast("Erro ao apagar a foto", {
                description: "Erro durante a tentativa de apagar a foto!"
            })
            throw error
        }
    }

    return {
        photo: data,
        nextPhotoId: data?.nextPhotoId,
        previousPhotoId: data?.previousPhotoId,
        isLoadingPhoto: isLoading,
        createPhoto,
        deletePhoto,
    }
}