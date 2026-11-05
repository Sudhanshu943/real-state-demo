import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MapPin, Plus } from 'lucide-react';
import { useExperience } from '../../app/providers';
import { ReferencePhoto, PhotographyCredits, type ReferencePhotoId } from './ReferencePhoto';
import '../../styles/home-sections.css';

const amenities: {name:string;tag:string;image:ReferencePhotoId;text:string;detail:string}[] = [
  {name:'The roof garden',tag:'01 / Open air',image:'roof',text:'A garden above the everyday. Our concept pairs sheltered seating with planted edges and room to pause.',detail:'Rooftop garden inspiration'},
  {name:'The residents’ salon',tag:'02 / Together',image:'lounge',text:'Warm materials and inviting seating set the tone for a shared space to read, meet, or simply unwind.',detail:'Shared lounge inspiration'},
  {name:'Space to reset',tag:'03 / Wellbeing',image:'wellness',text:'A considered space for movement and daily wellbeing, imagined as part of the residential experience.',detail:'Fitness studio inspiration'},
  {name:'A considered arrival',tag:'04 / Welcome',image:'arrival',text:'Natural light, generous proportions, and a calm reception create the first impression we are working toward.',detail:'Arrival & reception inspiration'},
];
const destinations = [
  {name:'Garden park',type:'Nature',text:'A green retreat, woven into the neighbourhood.'},
  {name:'Transit square',type:'Connection',text:'An imagined civic meeting point and transit node.'},
  {name:'Arts court',type:'Culture',text:'Galleries and a sheltered cultural courtyard.'},
  {name:'Market lane',type:'Everyday',text:'Cafés, local shops, and a slower daily rhythm.'},
  {name:'Work quarter',type:'Work',text:'A conceptual business district close to home.'},
];

function Chapter({number,children}:{number:string;children:React.ReactNode}){
  return <div className="chapter-label"><span>{number}</span><span className="chapter-rule"/>{children}</div>;
}

export function HomeSections(){
  const {project,dispatch}=useExperience();
  const [activeAmenity,setActiveAmenity]=useState(0);
  const amenity=amenities[activeAmenity];
  const skyline=project.collections.find(c=>c.id==='skyline')!;
  return <div className="home-chapters">
    <section id="vision" className="editorial-section vision-section">
      <Chapter number="01">The architectural idea</Chapter>
      <div className="vision-grid">
        <div className="vision-copy">
          <h2>Built around<br/><em>a quieter life.</em></h2>
          <p className="section-intro">Pale stone. Deep terraces. A little more room for light.</p>
          <p>AUREL brings the intimacy of a garden home to a vertical neighbourhood. Recessed glazing, bronze frames, and planted loggias give every elevation a sense of depth.</p>
          <Link className="text-link" to="/explore/building">Explore the architecture <ArrowUpRight size={17}/></Link>
          <dl className="architecture-facts">
            <div><dt>12</dt><dd>Residential levels</dd></div>
            <div><dt>3</dt><dd>Residence collections</dd></div>
            <div><dt>4.6<span>m</span></dt><dd>Arrival height</dd></div>
          </dl>
        </div>
        <figure className="architecture-figure">
          <ReferencePhoto id="facade"/>
          <figcaption><span>01.1 / Architectural inspiration</span><span>Reference photograph</span></figcaption>
        </figure>
      </div>
      <p className="reference-photography-note">Real spaces, selected for inspiration. Photography throughout this page does not depict the AUREL development.</p>
      <div className="material-strip" aria-label="Proposed material palette">
        <div className="material-heading"><span className="micro-label">A tactile palette</span><p>Materials that<br/>age with character.</p></div>
        {[
          ['travertine','Honed travertine','Warmth & natural variation'],
          ['bronze','Satin bronze','Fine frames & shaded reveals'],
          ['oak','Smoked oak','A quiet, grounded interior'],
          ['glass','Clear glazing','Light, depth & openness'],
        ].map(([id,name,desc],i)=><div className="material-item" key={id}>
          <div className={`material-sample material-sample--${id}`} aria-hidden="true"/>
          <span className="material-number">0{i+1}</span><strong>{name}</strong><span>{desc}</span>
        </div>)}
      </div>
    </section>

    <section id="residences" className="collection-section">
      <div className="editorial-section">
        <Chapter number="02">Find your perspective</Chapter>
        <div className="section-heading"><h2>Three ways<br/><em>to call it home.</em></h2><div><p>Different outlooks. The same attention to space, light, and the everyday.</p><Link className="text-link" to="/explore/building">Explore {project.units.length} example homes <ArrowUpRight size={17}/></Link></div></div>
        <article className="residence-feature">
          <Link to="/explore/floors/8" className="residence-photo"><ReferencePhoto id="living" sizes="(max-width: 700px) 100vw, 60vw"/><span className="image-label">Interior inspiration / Level 08 concept</span><span className="photo-arrow"><ArrowUpRight/></span></Link>
          <div className="residence-feature-copy"><span className="micro-label">03 bedrooms · Corner living</span><h3>{skyline.name}</h3><p>A generous living salon opens toward the terrace. Soft materials and layered light bring a sense of calm to city living.</p>
            <dl className="residence-facts"><div><dt>{skyline.internalAreaM2} <span>m²</span></dt><dd>Internal area</dd></div><div><dt>{skyline.terraceAreaM2} <span>m²</span></dt><dd>Private terrace</dd></div></dl>
            <Link className="solid-link" to="/explore/floors/8">Discover the Skyline <ArrowRight size={17}/></Link>
          </div>
        </article>
        <div className="supporting-residences">{(['garden','penthouse'] as const).map((id,i)=>{
          const c=project.collections.find(c=>c.id===id)!;
          const level=i===0?4:12;
          return <article key={id} className="residence-secondary">
            <Link className="secondary-photo" to={`/explore/floors/${level}`}><ReferencePhoto id={id}/><span className="image-label">Design inspiration / Level {String(level).padStart(2,'0')} concept</span></Link>
            <div className="secondary-copy"><div><span className="micro-label">{c.bedrooms} bedrooms / {i===0?'Garden outlook':'At the crown'}</span><h3>{c.name}</h3></div><Link className="round-link" to={`/explore/floors/${level}`} aria-label={`Explore ${c.name}`}><ArrowUpRight size={20}/></Link></div>
            <div className="secondary-caption"><span>{c.internalAreaM2} m² internal</span><span>{c.terraceAreaM2} m² terrace</span></div>
          </article>;
        })}</div>
        <p className="image-disclosure">Reference photography shows real spaces selected for inspiration, not these example homes. Areas are illustrative, with terraces shown separately.</p>
      </div>
    </section>

    <section id="amenities" className="amenity-section">
      <div className="editorial-section">
        <Chapter number="03">Life beyond your front door</Chapter>
        <div className="section-heading"><h2>Room for<br/><em>the everyday rituals.</em></h2><p>Some spaces bring us together.<br/>Others let us switch off.</p></div>
        <div className="amenity-layout">
          <figure className="amenity-image"><ReferencePhoto key={amenity.image} id={amenity.image}/><figcaption><span>{amenity.detail}</span><span>Reference photograph</span></figcaption></figure>
          <div className="amenity-accordion">{amenities.map((a,i)=><div className={`amenity-item ${i===activeAmenity?'is-active':''}`} key={a.name}>
            <button onClick={()=>setActiveAmenity(i)} aria-expanded={i===activeAmenity} aria-controls={`amenity-description-${i}`}><span className="micro-label">{a.tag}</span><span className="amenity-title">{a.name}</span><Plus size={19} aria-hidden="true"/></button>
            <div id={`amenity-description-${i}`} hidden={i!==activeAmenity}><p>{a.text}</p><span className="amenity-note">Proposed concept amenity</span></div>
          </div>)}</div>
        </div>
      </div>
    </section>

    <section id="location" className="editorial-section district-section">
      <Chapter number="04">A connected neighbourhood</Chapter>
      <div className="section-heading"><h2>A little closer<br/><em>to what matters.</em></h2><div><p>Green space, culture, and daily life—imagined together in one garden district.</p><Link className="text-link" to="/explore/district"><MapPin size={16}/> Explore the 3D district <ArrowUpRight size={17}/></Link></div></div>
      <div className="district-layout">
        <figure className="district-figure"><Link to="/explore/district"><ReferencePhoto id="district"/><span className="map-caption"><span>Green space & city life / Explore the concept district</span><ArrowUpRight size={20}/></span></Link><figcaption>Canalside park photography from Amsterdam, used as neighbourhood inspiration. The 3D district is an imagined setting.</figcaption></figure>
        <ol className="destination-list">{destinations.map((d,i)=><li key={d.name}><span className="destination-number">0{i+1}</span><div><h3>{d.name}</h3><p>{d.text}</p></div><span className="destination-type">{d.type}</span></li>)}</ol>
      </div>
      <PhotographyCredits/>
    </section>

    <section id="enquiry" className="closing-section">
      <div className="closing-inner"><Chapter number="05">Your next chapter</Chapter><h2>Some places<br/><em>just feel like home.</em></h2><p>Step inside the digital show residence.<br/>Find a perspective that feels like yours.</p><button className="solid-link" onClick={()=>dispatch({type:'OPEN_OVERLAY',overlay:{kind:'enquiry',unitIds:[]}})}>Arrange a private walkthrough <ArrowUpRight size={18}/></button><Link to="/explore/homes/A0801/tour/living" className="closing-tour">Or explore the 3D show residence <ArrowRight size={15}/></Link><span className="closing-disclosure">Concept demonstration only. No live bookings or commercial offering.</span></div>
      <div className="closing-mark" aria-hidden="true">A</div>
    </section>
  </div>;
}
