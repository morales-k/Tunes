import AudioPlayer from "react-h5-audio-player";

function Station(props) {
  return (
    <div className="station" key={props.station.id}>
      <div className="station-info">
        <img src={props.station.favicon} alt="Station logo." onError={props.setDefaultSrc} />
        <p>{props.station.name}</p>
      </div>
      <AudioPlayer
        className="player"
        src={props.station.urlResolved}
        showJumpControls={false}
        layout="stacked"
        customProgressBarSection={[]}
        customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
}

export default Station;