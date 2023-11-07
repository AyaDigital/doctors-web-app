import React from 'react';
import { NavLink } from "react-router-dom";
import './breadcrumb.scss';
import { BreadcrumbsProps, Breadcrumbs, Typography } from '@material-ui/core';

type Props = BreadcrumbsProps & {
  pathname: string | undefined,
};
/**
 * Breadcrumb component
 * This component handles the breadcrumb given a pathname and a function to
 * go to a specific location
 *
 * @pathname - (redux) the actual pathname from the router
 *
 */
const Breadcrumb: React.FC<Props> = ({ pathname = '' }) => {
  const locationItems = pathname ? pathname.split('/').filter(n => n) : [];

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {locationItems.length ? (
        <NavLink to='/'>Home</NavLink>
      ) : (
        <Typography color="textPrimary">Home</Typography>
      )} 
      {locationItems.map((item, index) => {
          if (index < locationItems.length - 1 ) {
            return (
              <NavLink key={item} to={pathname}>{item}</NavLink>
            )
          } else {
            return  (<Typography key={item} color="textPrimary">{item}</Typography>)
          }
      })}
  </Breadcrumbs>
  )
};

export default Breadcrumb;
