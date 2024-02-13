import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'journal-app-daviichii',
  api_key: '532267141884129',
  api_secret: 'KVl0PPCrb5gxPNANslg3vz3LdoM',
  secure: true
});

/* eslint-disable no-undef */
describe('Testing fileUpload', () => {
  it('should upload a file to cloudinary', async () => {
    const imgUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOW3vulu7m54dkxmGEj9MJY6ckejIwgaBw3w&usqp=CAU';
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], 'foto.png');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    // Delete image by ID
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');

    const respCloudi = await cloudinary.api.delete_resources([
      'journal-app/' + imageId
    ]);
    console.log(respCloudi);
  });
  it('should return null', async () => {
    const file = new File([], 'foto.png');

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
