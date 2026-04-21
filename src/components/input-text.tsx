import {tv, type VariantProps} from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";

export const inputTextContainerVariants = tv({
    base: "flex flex-col gap-1",
})

export const inputTextWrapperVariants = tv({
    base: `
    border border-solid border-border-primary
    focus:border-border-active bg-transparent
    rounded flex items-center gap-3
    `,
    variants: {
        size: {
            md: "h-10 p-3"
        },
        disabled: {
            true: "pointer-events-none",
        },
    },
    defaultVariants: {
        size: "md",
        disabled: false,
    }
})

export const inputTextVariants = tv({
    base: `
    bg-transparent outline-none placeholder:text-placeholder
    text-accent-paragraph flex-1`
})

export const inputTextIconVariants = tv({
    base: "fill-placeholder",
    variants: {
        size: {
            md: "w-6 h-6"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

// Omitimos as props "size" e "disabled" do input, pois elas já estão sendo usadas como variantes para o wrapper do input. 
// Assim, evitamos conflitos de props e mantemos a consistência na estilização do componente.
interface InputTextProps extends VariantProps<typeof inputTextWrapperVariants>, 
Omit<React.ComponentProps<"input">, "size" | "disabled"> {
    icon?: React.ComponentProps<typeof Icon>["svg"],
    error?: React.ReactNode
}

export default function InputText({size, icon, disabled, className, error, ...props}: InputTextProps) {
    return(
        <div className={inputTextContainerVariants({className})}>
            <div className={inputTextWrapperVariants({size, disabled})}>
                {icon && <Icon svg={icon} className={inputTextIconVariants({size})} />}
                <input name="input" className={inputTextVariants()} disabled={disabled as boolean} {...props} />
            </div>
            {error && <Text variant="label-small" className="text-accent-red">
                {error}
            </Text>}
        </div>
    )
}