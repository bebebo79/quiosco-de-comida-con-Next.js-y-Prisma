
// para agregar el icono de euro a los precios
export function formatCurrency (amount: number) {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}). format(amount)

}

// para cuando las imagenes vienen de cloudinary
export function getImagePathc(imagePath: string) {
    const imageWhichCloudinary = 'https://res.cloudinary.com'
    if(imagePath.startsWith(imageWhichCloudinary)) {
        return imagePath
    }else {
        return `/products/${imagePath}.jpg`
    }
}