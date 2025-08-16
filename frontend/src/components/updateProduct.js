export default function UpdateProduct() {
  return (
    <div>
      <h2>Mettre à jour un produit</h2>
      <form>
        <div>
          <label>Nom du produit:</label>
          <input type="text" />
        </div>
        <div>
          <label>Prix:</label>
          <input type="text" />
        </div>
        <div>
          <label>Description:</label>
          <textarea />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}
