//

import Input from './Input';

import Button from './Button';
import Tooltip from './Tooltip';

import Progress from './Progress';
import LoadingButton from './LoadingButton';
import ControlLabel from "./ControlLabel";
import Dialog from "./Dialog";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
    return Object.assign(
        Input(theme),
        Button(theme),
        Dialog(theme),
        Tooltip(theme),
        Progress(theme),
        LoadingButton(theme),
        ControlLabel(theme),
    );
}
