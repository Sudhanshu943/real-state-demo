import photography from '../../data/homePhotography.json';

export type ReferencePhotoId = keyof typeof photography;

/** Locally hosted real-space photographs. These illustrate the mood, not the concept building. */
export function ReferencePhoto({id,sizes='(max-width: 700px) 100vw, 50vw'}:{id:ReferencePhotoId;sizes?:string}){
  const photo=photography[id];
  return <img
    src={photo.variants['1280']}
    srcSet={`${photo.variants['640']} 640w, ${photo.variants['1280']} 1280w`}
    sizes={sizes}
    width={photo.width}
    height={photo.height}
    alt={`${photo.alt}. Reference photography, not the AUREL development.`}
    style={{objectPosition:photo.position}}
    loading="lazy"
    decoding="async"
  />;
}

export function PhotographyCredits(){
  return <details className="photography-credits">
    <summary>Photography & credits <span aria-hidden="true">+</span></summary>
    <p>Real spaces, selected as design inspiration. These photographs do not depict AUREL or its actual residences, amenities, or location.</p>
    <ul>{Object.values(photography).map(photo=><li key={photo.id}><span>{photo.title}</span><a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.photographer} / Unsplash ↗</a></li>)}</ul>
    <a className="photo-license-link" href="https://unsplash.com/license" target="_blank" rel="noreferrer">Unsplash License ↗</a>
  </details>;
}
