const productos = [
  { id:1, nombre:'Llave inglesa 10″', precio:3200, stock:6 },
  { id:2, nombre:'Destornillador Phillips', precio:850, stock:12 },
  { id:3, nombre:'Juego de llaves Allen', precio:1500, stock:8 }
];

let carrito = {};

function renderProductos(){
  const catalogo = document.getElementById('catalogo');
  productos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <p>Stock: <span id="stock-${p.id}">${p.stock}</span></p>
      <button ${p.stock===0?'disabled':''} onclick="agregarCarrito(${p.id})">Agregar</button>
    `;
    catalogo.appendChild(div);
  });
}

function agregarCarrito(id){
  const p = productos.find(x=>x.id===id);
  if(p.stock<=0) return alert('Sin stock');
  carrito[id] = (carrito[id]||0)+1;
  p.stock--;
  document.getElementById(`stock-${id}`).innerText = p.stock;
  actualizarCarrito();
}

function actualizarCarrito(){
  const cont = document.getElementById('items-carrito');
  cont.innerHTML = '';
  let total = 0;
  Object.entries(carrito).forEach(([id, cant]) => {
    const p = productos.find(x=>x.id==id);
    total += p.precio * cant;
    cont.innerHTML += `<div class="item">
      <b>${p.nombre}</b><br>
      Cantidad: <button onclick="cambiarCant(${id},-1)">➖</button>
                ${cant}
                <button onclick="cambiarCant(${id},1)">➕</button>
      <br>$${p.precio * cant}
    </div>`;
  });
  document.getElementById('total').innerText = total;
  document.getElementById('carrito-count').innerText = Object.values(carrito).reduce((a,b)=>a+b,0);
}

function cambiarCant(id, delta){
  const p = productos.find(x=>x.id===id);
  const nueva = (carrito[id]||0)+delta;
  if(nueva<0) return;
  if(delta>0 && p.stock<=0) return alert('Sin más stock');
  carrito[id] = nueva;
  p.stock -= delta;
  if(nueva===0) delete carrito[id];
  actualizarCarrito();
  document.getElementById(`stock-${id}`).innerText = p.stock;
}

document.getElementById('form-contacto').addEventListener('submit', e => {
  e.preventDefault();
  alert('¡Mensaje enviado! Nos contactaremos pronto.');
});

renderProductos();
