import React from 'react';
import classnames from 'classnames';

const Pagination = ({orgsPerPage, totalOrgItems, paginate, currentPage}) => {

    let pageNumbers =[];
    
    const getPaginate = () => {
        const count = Math.ceil(totalOrgItems / orgsPerPage);
        return new Array(count).fill(null).map( (_, i) => (
            <button key={i} className={classnames({ active: i == currentPage-1 })} onClick={()=> paginate(i + 1)}>{i + 1}</button>
        ))
    }
        
    return getPaginate()
}

export default Pagination;
