import classNames from "classnames";
import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";

export interface ClickableProps {
    className?: string,
    style?: CSSProperties,
    to?: string,
    onClick?: (e: React.MouseEvent) => void | Promise<void>,
    linkType?: "normal" | "no-router" | "new-tab",
    disabled?: boolean,
    submit?: boolean,
    children: React.ReactNode
}

export function Clickable({
    className,
    style,
    to,
    onClick,
    linkType = "normal",
    disabled = false,
    submit = false,
    children
}: ClickableProps) {
    if (to) {
        if (disabled) {
            return (
                <div
                    className={classNames(className, "disabled")}
                    style={style}
                >{children}</div>
            )
        }
        else if (linkType !== "normal") {
            return (
                <a
                    href={to}
                    onClick={onClick}
                    className={className}
                    style={style}
                    {...(linkType === "new-tab" ? {
                        target: "_blank",
                        referrerPolicy: "no-referrer"
                    } : {})}
                >{children}</a>
            )
        }
        else {
            return (
                <Link
                    to={to}
                    onClick={onClick}
                    className={className}
                    style={style}
                >{children}</Link>
            )
        }
    }
    else {
        return (
            <button
                onClick={onClick}
                className={classNames(className, {disabled})}
                disabled={disabled}
                style={style}
                type={submit ? "submit" : "button"}
            >{children}</button>
        )
    }
}