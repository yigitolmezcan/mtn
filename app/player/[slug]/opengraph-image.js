// TR route'undaki üretecin aynısı. `size` ve `contentType` de re-export
// edilmeli, yoksa Next og:image:width/height/type etiketlerini basmıyor.
export { default, size, contentType } from '../../oyuncu/[slug]/opengraph-image';
