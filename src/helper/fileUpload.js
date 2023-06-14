

export const fileUpload = async(file) => {

    //Upload Files
    if(!file) throw new Error('No tenemos ningun archivo a subir')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dh0zywiza/upload';

    //Crear el form Data
    const formData = new FormData();

    //Hacer los append necesarios 
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    //Esto puede fallar asi que uso Try
    try {

        //Se crea el post con el boy que es el formData
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if(!resp.ok) throw new Error('No se pudo subir la imagen')

        const cloudResp  = await resp.json();

        return cloudResp.secure_url;

        
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }

}
