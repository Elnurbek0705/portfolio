import React, { useState, useEffect, useRef, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import Tooltip from './Tooltip';

const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [ready, setReady] = useState(false);
  const { t } = useContext(LanguageContext);
  const winRef = useRef(null);

  useEffect(() => {
    if (!window.__TAURI_INTERNALS__) return;
    let unlisten = null;

    const init = async () => {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        const win = getCurrentWindow();
        winRef.current = win;
        setIsMaximized(await win.isMaximized());
        setReady(true);
        unlisten = await win.onResized(async () => {
          setIsMaximized(await win.isMaximized());
        });
      } catch (e) {
        console.error('TitleBar:', e);
      }
    };

    init();
    return () => { unlisten?.(); };
  }, []);

  const minimize = () => winRef.current?.minimize();
  const maximize = () => winRef.current?.toggleMaximize();
  const close    = () => winRef.current?.close();

  if (!window.__TAURI_INTERNALS__ || !ready) return null;

  return (
    <>
      <style>{`
        /* ── Titlebar container ── */
        #custom-titlebar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 36px;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px 0 14px;

          /* Glass + accent border */
          background: color-mix(in srgb, var(--bg-secondary) 80%, transparent);
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          border-bottom: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);

          /* Subtle neon glow along bottom edge */
          box-shadow:
            0 1px 0 0 color-mix(in srgb, var(--accent) 15%, transparent),
            0 4px 24px 0 color-mix(in srgb, var(--accent) 6%, transparent);

          user-select: none;
        }

        /* Neon top line — accent rengida ingichka chiziq */
        #custom-titlebar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            color-mix(in srgb, var(--accent) 60%, transparent) 20%,
            color-mix(in srgb, var(--accent) 90%, transparent) 50%,
            color-mix(in srgb, var(--accent) 60%, transparent) 80%,
            transparent 100%
          );
          animation: tb-line-pulse 3s ease-in-out infinite;
        }
        @keyframes tb-line-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        /* ── Drag zone ── */
        #tb-drag {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 9px;
          -webkit-app-region: drag;
          cursor: default;
        }

        /* Neon pulse dot */
        #tb-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow:
            0 0 6px var(--accent),
            0 0 14px color-mix(in srgb, var(--accent) 60%, transparent),
            0 0 28px color-mix(in srgb, var(--accent) 30%, transparent);
          animation: tb-dot-breathe 2.8s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes tb-dot-breathe {
          0%, 100% {
            opacity: 0.7;
            box-shadow:
              0 0 4px var(--accent),
              0 0 10px color-mix(in srgb, var(--accent) 50%, transparent);
          }
          50% {
            opacity: 1;
            box-shadow:
              0 0 8px var(--accent),
              0 0 20px color-mix(in srgb, var(--accent) 70%, transparent),
              0 0 36px color-mix(in srgb, var(--accent) 35%, transparent);
          }
        }

        /* Title text */
        #tb-title {
          font-family: 'Cutive Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--accent) 80%, var(--text-main));
          opacity: 0.85;

          /* Subtle text glow */
          text-shadow:
            0 0 8px color-mix(in srgb, var(--accent) 50%, transparent),
            0 0 20px color-mix(in srgb, var(--accent) 25%, transparent);
        }

        /* ── Window controls ── */
        #tb-controls {
          display: flex;
          align-items: center;
          gap: 5px;
          -webkit-app-region: no-drag;
          flex-shrink: 0;
        }

        .tb-btn {
          width: 30px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
          border-radius: 5px;
          background: color-mix(in srgb, var(--accent) 6%, transparent);
          color: color-mix(in srgb, var(--accent) 70%, var(--text-muted));
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.08s;
          padding: 0;
          outline: none;
        }
        .tb-btn:hover {
          background: color-mix(in srgb, var(--accent) 16%, transparent);
          border-color: color-mix(in srgb, var(--accent) 40%, transparent);
          box-shadow:
            0 0 8px color-mix(in srgb, var(--accent) 25%, transparent),
            inset 0 0 8px color-mix(in srgb, var(--accent) 10%, transparent);
          color: var(--text-main);
        }
        .tb-btn:active { transform: scale(0.88); }

        /* Close button — qizil hover */
        .tb-btn-close:hover {
          background: rgba(232, 69, 90, 0.2) !important;
          border-color: rgba(232, 69, 90, 0.5) !important;
          box-shadow: 0 0 10px rgba(232, 69, 90, 0.3), inset 0 0 8px rgba(232,69,90,0.1) !important;
          color: #ff6b7a !important;
        }

        .tb-btn svg {
          width: 11px; height: 11px;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          pointer-events: none;
        }

        /* App layout uchun joy */
        .app-container { padding-top: 36px !important; }
      `}</style>

      <div id="custom-titlebar">
        <div id="tb-drag">
          <span id="tb-dot" />
          <span id="tb-title">Portfolio - A.Elnurbek</span>
        </div>

        <div id="tb-controls">
          {/* Minimize */}
          <Tooltip text={t('titleBar.minimize')} position="bottom">
            <button className="tb-btn" onClick={minimize}>
              <svg viewBox="0 0 12 12">
                <line x1="1" y1="6" x2="11" y2="6" />
              </svg>
            </button>
          </Tooltip>

          {/* Maximize / Restore */}
          <Tooltip text={isMaximized ? t('titleBar.restore') : t('titleBar.maximize')} position="bottom">
            <button className="tb-btn" onClick={maximize}>
              {isMaximized ? (
                <svg viewBox="0 0 12 12">
                  <rect x="3.5" y="1.5" width="7" height="7" rx="1" />
                  <path d="M1.5 4v5.5a1 1 0 001 1H8" />
                </svg>
              ) : (
                <svg viewBox="0 0 12 12">
                  <rect x="1.5" y="1.5" width="9" height="9" rx="1.2" />
                </svg>
              )}
            </button>
          </Tooltip>

          {/* Close */}
          <Tooltip text={t('titleBar.close')} position="bottom">
            <button className="tb-btn tb-btn-close" onClick={close}>
              <svg viewBox="0 0 12 12">
                <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" />
                <line x1="10.5" y1="1.5" x2="1.5" y2="10.5" />
              </svg>
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default TitleBar;
