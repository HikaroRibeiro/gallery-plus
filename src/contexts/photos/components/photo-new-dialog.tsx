import React from "react"
import { useForm } from "react-hook-form"
import Alert from "../../../components/alert"
import Button from "../../../components/button"
import { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog"
import ImagePreview from "../../../components/image-preview"
import InputSingleFile from "../../../components/input-single-file"
import InputText from "../../../components/input-text"
import Skeleton from "../../../components/skeleton"
import Text from "../../../components/text"
import useAlbums from "../../albums/hooks/use-albums"
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import usePhoto from "../hooks/use-photo"


interface PhotoNewDialog {
    trigger: React.ReactNode
}

export default function PhotoNewDialog({trigger}:PhotoNewDialog) {

    const [modalOpen, setModalOpen] = React.useState(false);

    const {albums, isLoadingAlbums} = useAlbums();

    const {createPhoto} = usePhoto();

    const [isCreatingPhoto, setIsCreatingPhoto] = React.useTransition();

    const form = useForm<PhotoNewFormSchema>({
        resolver: zodResolver(photoNewFormSchema) // Irá resolver o formulário com base no schema do ZOD que foi criado.
    })

    const file = form.watch("file");
	const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

    const albumsIds = form.watch("albumsIds");

    React.useEffect(() => {
        if(!modalOpen) {
            form.reset();
        }
        
    },[modalOpen, form])

    function handleToggleAlbum(albumId: string) {
        const albumsIds = form.getValues("albumsIds") || [];
        const albumsSet = new Set(albumsIds);

        if(albumsSet.has(albumId)) {
            albumsSet.delete(albumId);
            console.log("albumsSet delete:", albumsSet)
        } else {
            albumsSet.add(albumId);
            console.log("albumsSet add:", albumsSet)
        }

        form.setValue("albumsIds", Array.from(albumsSet));
    }

    function handleSubmit(payload: PhotoNewFormSchema) {
        setIsCreatingPhoto(async () => {
            await createPhoto(payload);
            setModalOpen(false);
        })
    }

    return(
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogHeader>Adicionar foto</DialogHeader>
                    <DialogBody className="flex flex-col gap-5">
                        <InputText 
                            placeholder="Adicione um título" 
                            maxLength={255}
                            error={form.formState.errors.title?.message}
                            {...form.register("title")}
                        />
                        <Alert>
                            Tamanho máximo: 50MB
                            <br />
                            Você pode selecionar arquivo em PNG, JPG ou JPEG.
                        </Alert>
                        <InputSingleFile 
                            form={form} 
                            allowedExtensions={['png', 'jpg', 'jpeg']} 
                            maxFileSixeInMB={50}
                            replaceBy={
                                <ImagePreview src={fileSource} className="w-full h-56" />
                            }
                            error={form.formState.errors.file?.message}
                            {...form.register("file")}
                        />

                        <div className="space-y-3">
                            <Text variant="label-small">Selecionar álbuns</Text>
                            <div className="flex flex-wrap gap-3">

                            
                                {!isLoadingAlbums && albums.length > 0 && albums.map((album) => 
                                    (
                                        <Button 
                                            key={album.id} 
                                            variant={albumsIds?.includes(album.id) ? "primary" : "ghost"}
                                            size="sm" 
                                            className="truncate"
                                            onClick={() => handleToggleAlbum(album.id)}
                                        >
                                            {album.title}
                                        </Button>
                                    )) 
                                }

                                {isLoadingAlbums && Array.from({length:5}).map((_,index) => 
                                    <Skeleton key={`album-index-${index}`} className="w-20 h-7" />
                                )}
                            </div>
                        </div>
                    </DialogBody>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={isCreatingPhoto} variant="secondary">Cancelar</Button>
                        </DialogClose>
                        <Button disabled={isCreatingPhoto} handling={isCreatingPhoto} type="submit">{isCreatingPhoto ? "Adicionando..." : "Adicionar"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}