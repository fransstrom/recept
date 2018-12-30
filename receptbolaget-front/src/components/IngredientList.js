import React, { Component } from 'react'

const IngredientList=({ingredients})=>(
<ol>
    {ingredients.map(ingredients=>{
        return<li key={ingredients.Nummer}> 
        
        
       {ingredients.quantity ? (<div>{ingredients.quantity}{ingredients.measure} {ingredients.Namn} </div>):<div>{ingredients.Namn}</div>} 

        </li>
    })}
</ol>
);

export default IngredientList