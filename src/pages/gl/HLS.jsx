import { useEffect, useRef } from "react";

export default function HlsPlayer({
    src,
    autoPlay = false,
    controls = true,
    muted = false,
    poster,
    className,
    forceMSE = false, // 👈 NEW
}) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !src) return;

        let hls;
        let cancelled = false;

        const canPlayNative =
            video.canPlayType("application/vnd.apple.mpegurl") ||
            video.canPlayType("application/x-mpegURL");

        // ✅ Native HLS ONLY if not forcing MSE
        if (canPlayNative && !forceMSE) {
            video.src = src;
            return () => {
                video.removeAttribute("src");
                video.load();
            };
        }

        // ✅ MSE path (this creates blob:)
        (async () => {
            const mod = await import("hls.js");
            if (cancelled) return;

            const Hls = mod.default;
            if (!Hls.isSupported()) {
                console.warn("HLS not supported via MSE.");
                return;
            }

            hls = new Hls({
                enableWorker: true,
            });

            hls.attachMedia(video);

            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                hls.loadSource(src);
            });
        })();

        return () => {
            cancelled = true;
            if (hls) hls.destroy();
        };
    }, [src, forceMSE]);

    return (
        <video
            ref={videoRef}
            controls={controls}
            autoPlay={autoPlay}
            muted={muted}
            poster={poster}
            className={className}
            playsInline
        />
    );
}
