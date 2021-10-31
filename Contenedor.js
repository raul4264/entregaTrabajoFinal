const fs = require('fs');

class Contenedor {
  constructor(file) {
    this.file = file;
  }
  
  async save(producto) {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
  
      let productos = [];
      if (contenido === '') {
        console.log('anda')
        producto.id = 1;
        producto.timestamp = Date.now();
        productos.push(producto);
      } else {
        const listaDeProducto = JSON.parse(contenido);
    
        producto.id = listaDeProducto[listaDeProducto.length - 1].id + 1;
        producto.timestamp = Date.now();
        listaDeProducto.push(producto);
        productos = listaDeProducto;
      }
  
      const productosString = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile(`./${this.file}`, productosString);

      return producto.id; 
    } catch (error) {
      console.error('Error:', error);
    };
  }
  async getById(id) {
    try {
        const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
        const listaDeProducto = JSON.parse(contenido);
        if (listaDeProducto === '') {
          return null;
        } else {
          const elementoEncontrado = listaDeProducto.find(elemento => elemento.id === parseInt(id));
          return elementoEncontrado;
        }
    }catch (error) {
      console.error('Error:', error);
    };
  }
  async getAll() {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
      const listaDeProducto = JSON.parse(contenido);
      if (!listaDeProducto === '') {
        console.log("test")
      } else {
        return listaDeProducto;
      }
    } catch (error) {
      console.error('Error:', error);
    };
  }
  async deleteById(id) {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
      const listaDeProducto = JSON.parse(contenido);
      if (listaDeProducto === '') {
      } else {
        const listaActualizada = listaDeProducto.filter(elemento => elemento.id === id);
        const listString = JSON.stringify(listaActualizada, null, 2);
        await fs.promises.writeFile(`./${this.file}`, listString);
      }
    }catch (error) {
      console.error('Error:', error);
    };
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(`./${this.file}`, '');
    } catch (error) {
      console.error('Error:', error);
    };
  }
  async update(id, element) {
    const list = await this.getAll();
    console.log({list})
    console.log({id})

    const elementSaved = list.find((item) => item.id === parseInt(id));
    const indexElementSaved = list.findIndex((item) => item.id === parseInt(id));
    console.log({elementSaved})
    if (!elementSaved) {
      console.error(`Elemento con el id: '${id}' no fue encontrado`);
      return null;
    }

    const elementUpdated = {
      ...elementSaved,
      ...element
    };

    list[indexElementSaved] = elementUpdated;

    const elementsString = JSON.stringify(list, null, 2);
    await fs.promises.writeFile(`./${this.file}`, elementsString);

    return elementUpdated;
  }
}

module.exports = Contenedor;