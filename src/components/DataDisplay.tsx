// src/components/DataDisplay.tsx
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/DataDisplay.module.css';
import DOMPurify from 'dompurify';

export interface VideoGameDataModel {
  [key: string]: any;
  game_Title: string;
  user_Rating: number;
  age_Group_Targeted: string;
  price: number;
  platform: string;
  requires_Special_Device: string;
  developer: string;
  publisher: string;
  release_Year: number;
  genre: string;
  multiplayer: string;
  game_Length: number;
  graphics_Quality: string;
  soundtrack_Quality: string;
  story_Quality: string;
  user_Review_Text: string;
  game_Mode: string;
  min_Number_of_Players: number;
}

interface DataDisplayProps {
  games: VideoGameDataModel[];
  searchTerm: string;
  onRender: () => void;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ games, searchTerm }) => {
  const [expandedCard, setExpandedCard] = useState<VideoGameDataModel | null>(null);
  const expandedCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (expandedCardRef.current && !expandedCardRef.current.contains(target)) {
        setExpandedCard(null); // Close the expanded card
      }
    };

    if (expandedCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedCard]);
  const handleCardClick = (game: VideoGameDataModel) => {
    setExpandedCard(game);
  };

  const handleClose = () => {
    setExpandedCard(null);
  };

  const highlightText = (text: string, term: string) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, `<span class="${styles.highlight}">$1</span>`);
  };

  if (!games.length) return <p>No games available to display.</p>;

  return (
    <>
      {/* Dimmed overlay for expanded card */}
      {expandedCard && <div className={styles.dimmedOverlay} onClick={handleClose}></div>}

      {/* Cards container */}
      <div
        className={`${styles.dataDisplayContainer} ${
          expandedCard ? styles.blurred : ''
        }`}
      >
        {games.map((game) => (
          <div
            key={`${game.game_Title}-${game.release_Year}`}
            className={styles.card}
            onClick={() => handleCardClick(game)}
          >
            <img
              src="/game.webp"
              alt={game.game_Title || 'Game Image'}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3
                  className={styles.gameTitle}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      highlightText(game.game_Title, searchTerm)
                    ),
                  }}
                ></h3>
                <p className={styles.gamePrice}>${game.price.toFixed(2)}</p>
              </div>
              <p className={styles.userRating}>User Rating: {game.user_Rating}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded card content */}
      {expandedCard && (
        <div className={styles.expandedCardContainer}>
          <div className={styles.expandedCard} ref={expandedCardRef}>
            <button className={styles.closeButton} onClick={handleClose}>
              &times;
            </button>
            <h2
              className={styles.expandedTitle}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  highlightText(expandedCard.game_Title, searchTerm)
                ),
              }}
            ></h2>
            <img
              src="/game.webp"
              alt={expandedCard.game_Title || 'Game Image'}
              className={styles.expandedImage}
            />
            <div className={styles.expandedDetails}>
              <p><strong>Price:</strong> ${expandedCard.price.toFixed(2)}</p>
              <p><strong>User Rating:</strong> {expandedCard.user_Rating}</p>
              <p><strong>Genre:</strong> {expandedCard.genre}</p>
              <p><strong>Platform:</strong> {expandedCard.platform}</p>
              <p><strong>Release Year:</strong> {expandedCard.release_Year}</p>
              <p><strong>Developer:</strong> {expandedCard.developer}</p>
              <p><strong>Publisher:</strong> {expandedCard.publisher}</p>
              <p><strong>Game Mode:</strong> {expandedCard.game_Mode}</p>
              <p><strong>Review:</strong> {expandedCard.user_Review_Text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataDisplay;