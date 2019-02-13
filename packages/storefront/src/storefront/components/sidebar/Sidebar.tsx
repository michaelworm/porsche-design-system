import React from "react"
import cx from "classnames"
import { prefix } from "@porscheui/porsche-ui-kit"
import "./sidebar.scss"
import { Stories } from "../../../stories"
import { Link, Redirect } from "react-router-dom"

export interface SidebarLinkProps {
  to: string
  title: string
}

export const SidebarLink: React.FunctionComponent<SidebarLinkProps> = (props) => {
  return (
    <Link to={props.to}>
      <div className={cx(prefix("sidebar__item"))}>{props.title}</div>
    </Link>
  )
}

export interface SidebarCategory {
  title: string
}

export const SidebarCategory: React.FunctionComponent<SidebarCategory> = (props) => {
  return (
    <div className={cx(prefix("sidebar__category"))}>
      <div className={cx(prefix("sidebar__category__title"))}>{props.title}</div>
      {props.children}
    </div>
  )
}

export const Sidebar: React.FunctionComponent = (props) => {
  const categories = Object.keys(Stories)

  return (
    <aside className={cx(prefix("sidebar"))}>
      {props.children}
      <hr className={prefix("sidebar__hr")} />
      {categories.map((category) => {
        const stories = Object.keys((Stories as any)[category])
        if (!stories) {
          return <Redirect to="/introduction" />
        }
        return (
          <SidebarCategory key={category} title={category}>
            {stories.map((story) => {
              return <SidebarLink key={story} to={`/${category.toLowerCase()}/${story.toLowerCase()}`} title={story} />
            })}
          </SidebarCategory>
        )
      })}
    </aside>
  )
}
