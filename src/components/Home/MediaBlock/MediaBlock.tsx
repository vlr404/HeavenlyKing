import { useState } from 'react';
import './MediaBlock.css';

import { BlockCeremony } from '../BlockCeremony/BlockCeremony';
import { BlockMusic } from '../BlockMusic/BlockMusic';
import { BlockVideo } from '../BlockVideo/BlockVideo';

type MediaTab = 'ceremony' | 'music' | 'video';

export const MediaBlock = () => {
    const [activeTab, setActiveTab] = useState<MediaTab>('ceremony');

    return (
        <section className="media-block">
            <div className="media-tabs">
                <button
                    className={activeTab === 'ceremony' ? 'active' : ''}
                    onClick={() => setActiveTab('ceremony')}
                >ЦЕРЕМОНИИ</button>
                <button
                    className={activeTab === 'music' ? 'active' : ''}
                    onClick={() => setActiveTab('music')}
                >МУЗЫКА</button>
                <button
                    className={activeTab === 'video' ? 'active' : ''}
                    onClick={() => setActiveTab('video')}
                >ВИДЕО</button>
            </div>

            <div className="media-block-container">
                {activeTab === 'ceremony' && <BlockCeremony />}
                {activeTab === 'music'    && <BlockMusic />}
                {activeTab === 'video'    && <BlockVideo />}
            </div>
        </section>
    );
};