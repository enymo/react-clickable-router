import classNames from "classnames";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

export type ClickableProps = 
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">
    & React.HTMLAttributes<HTMLDivElement>
    & Omit<LinkProps, "type" | "to" | "target" | "referrerPolicy">
    & {
        to?: string,
        linkType?: "normal" | "no-router" | "new-tab",
        submit?: boolean
    }

export function Clickable({
    className,
    to,
    onClick,
    linkType = "normal",
    disabled = false,
    submit = false,
    ...props
}: ClickableProps) {
    if (to && !disabled) {
        if (linkType !== "normal") {
            return (
                <a
                    href={to}
                    onClick={onClick}
                    className={className}
                    {...(linkType === "new-tab" ? {
                        target: "_blank",
                        referrerPolicy: "no-referrer"
                    } : {})}
                    {...props}
                />
            )
        }
        else {
            return (
                <Link
                    to={to}
                    onClick={onClick}
                    className={className}
                    {...props}
                />
            )
        }
    }
    else if (submit || onClick) {
        return (
            <button
                onClick={onClick}
                className={classNames(className, {disabled})}
                disabled={disabled}
                type={submit ? "submit" : "button"}
                {...props}
            />
        )
    }
    else {
        return (
            <div
                className={classNames(className, {disabled})}
                {...props}
            />
        )
    }
}