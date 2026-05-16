import { toast } from "sonner";
import { api } from "../../../helpers/api";
import { useQueryClient } from "@tanstack/react-query";


export default function usePhotoAlbums() {
    const queryClient = useQueryClient();

    async function managePhotoOnAlbum(photoId: string, albumsIds: string[]) {
        try {
            await api.put(`/photos/${photoId}/albums`, {
                albumsIds
            });

            queryClient.invalidateQueries({queryKey: ["photo", photoId]});
            queryClient.invalidateQueries({queryKey: ["albums"]});
            queryClient.invalidateQueries({queryKey: ["photos"]});

            toast.success("Álbuns da foto atualizados com sucesso!", {
                description: "Os álbuns da foto foram atualizados com sucesso."
            })
        } catch (error) {
            toast.error("Erro ao atualizar os álbuns da foto.", {
                description: "Não foi possível atualizar os álbuns da foto. Por favor, tente novamente."
            })
            throw error;
        }
    }

    return {
        managePhotoOnAlbum,
    }
}