import React, { useRef } from 'react';

export default function Demo() {undefined

const list = [1, 2, 3, 4, 5];

const liRef = useRef();

return (

{undefined

list.map(item => {undefined

return

{item}
})

}

console.log(liRef.current)}>getRef

)

}
