import * as DialogPrimitive from "@radix-ui/react-dialog";
import Card from "./card";
import cn from "classnames";
import Text from "./text";
import ButtonIcon from "./button-icon";
import XIcon from "../assets/icons/x.svg?react";
import Divider from "./divider";

export const Dialog = DialogPrimitive.Root; // Componente de nível superior para o diálogo
export const DialogTrigger = DialogPrimitive.Trigger; // Componente que aciona a abertura do diálogo, geralmente um botão
export const DialogClose = DialogPrimitive.Close; // Componente para fechar o diálogo, pode ser usado dentro do conteúdo do diálogo

export function DialogOverlay({className, ...props}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay className={cn(`
            fixed inset-0 z-[50] bg-background-secondary/50
            backdrop-blur-sm
            data-[state=open]:animate-in
            data-[state=open]:fade-in-0
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
        `, className)} {...props} />
    );
}

export function DialogContent({className, ref, children, ...props}: React.ComponentProps<typeof DialogPrimitive.Content>) {
    return (
        <DialogPrimitive.Portal>
            <DialogOverlay />
            <DialogPrimitive.Content ref={ref} className={cn(`
                fixed left-[50%] top-[50%] w-full max-w-[32rem]
                z-[60] translate-x-[-50%] translate-y-[-50%]
                data-[state=open]:animate-in
                data-[state=open]:fade-in-0 
                data-[state=open]:slide-in-from-bottom-[48%]
                data-[state=closed]:animate-out
                data-[state=closed]:fade-out-0
                data-[state=closed]:slide-out-to-bottom-[48%]
                `, className)} {...props}>
                <Card size="lg" variant="primary">
                    {children}
                </Card>
            </DialogPrimitive.Content>
            <DialogPrimitive.Title className="sr-only">Dialog</DialogPrimitive.Title>
            <DialogPrimitive.DialogDescription className="sr-only">Dialog</DialogPrimitive.DialogDescription>
        </DialogPrimitive.Portal>
    );
}

export function DialogHeader({children, className, ...props}: React.ComponentProps<"div">) {
    return (
        <>
            <header className={cn(`
                flex items-center justify-between
                `, className)} {...props}>
                <DialogPrimitive.Title className="text-lg font-semibold">
                    <Text variant="heading-medium">{children}</Text>
                </DialogPrimitive.Title>

                <DialogClose asChild> 
                    <ButtonIcon icon={XIcon} variant="ghost"/>
                </DialogClose>
            </header>
            <Divider className="mt-1.5 mb-5" />
        </>
    )
}

export function DialogBody({children, className, ...props}: React.ComponentProps<"div">) {
    return (
        <div className={cn(`
            flex flex-col gap-4
            `, className)} {...props}>
            {children}
        </div>
    )
}

export function DialogFooter({children, ...props}: React.ComponentProps<"div">) {
    return (
        <div {...props}>
            <Divider className="mt-5 mb-1.5" />
            <footer className="flex items-center justify-end gap-3" {...props}>
                {children}
            </footer>
        </div>
    )
}

