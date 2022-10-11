import React from 'react'

export default function Loading(props) {
  return (
    <div style={{background: "#ffa14e", textAlign: "center", paddingTop: "1em", color:"black", fontWeight: "800" }}>
        {props.loadingMsg}
<lord-icon
    src="https://cdn.lordicon.com/xjovhxra.json"
    trigger="loop"
    delay="500"
    colors={{primary:"#fff",secondary:"#fff"}}
    stroke="25"
    style={{width:"100%",height:"250px"}}>
</lord-icon>
    </div>
  )
}
