/*
 * Copyright (C) 2012-2020  Online-Go.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as React from "react";
import { _ } from "translate";
import { useNavigate } from "react-router-dom";

const ROCKET_LAUNCH_DURATION = 1.25; // seconds. This should match the time in LandingPage.styl to sync animation and navigation
let navigate_timeout;

export function LandingPage(): JSX.Element {
    const navigate = useNavigate();
    const [learn_to_play_launching, set_learn_to_play_launching]: [boolean, (tf: boolean) => void] =
        React.useState(false as boolean);
    const [play_launching, set_play_launching]: [boolean, (tf: boolean) => void] = React.useState(
        false as boolean,
    );

    function learnToPlay() {
        if (learn_to_play_launching) {
            return;
        }
        if (play_launching) {
            set_learn_to_play_launching(false);
            if (navigate_timeout) {
                clearTimeout(navigate_timeout);
            }
        }
        set_learn_to_play_launching(true);
        navigate_timeout = setTimeout(() => {
            //set_learn_to_play_launching(false);
            console.log("Go to learn to play");
            navigate("/learn-to-play");
        }, ROCKET_LAUNCH_DURATION * 1000);
    }

    function play() {
        if (play_launching) {
            return;
        }
        if (learn_to_play_launching) {
            set_learn_to_play_launching(false);
            if (navigate_timeout) {
                clearTimeout(navigate_timeout);
            }
        }
        set_play_launching(true);
        setTimeout(() => set_play_launching(false), 3000);
        navigate_timeout = setTimeout(() => {
            //set_play_launching(false);
            console.log("Go to play");
            navigate("/game/0");
        }, ROCKET_LAUNCH_DURATION * 1000);
    }

    return (
        <div id="LandingPage">
            <div className="mountain-background">Mountain Background</div>
            <div className={`learn-to-play-rocket ${learn_to_play_launching ? "launch" : ""}`}>
                <div>R</div>
                <div>O</div>
                <div>C</div>
                <div>K</div>
                <div>E</div>
                <div>T</div>
                <div className="flames">FLAMES</div>
            </div>

            <div className={`play-rocket ${play_launching ? "launch" : ""}`}>
                <div>R</div>
                <div>O</div>
                <div>C</div>
                <div>K</div>
                <div>E</div>
                <div>T</div>
                <div className="flames">FLAMES</div>
            </div>
            <div className="learn-to-play-button-container">
                <button onClick={learnToPlay}>{_("Learn to Play")}</button>
            </div>
            <div className="play-button-container">
                <button onClick={play}>{_("Play")}</button>
            </div>
        </div>
    );
}
