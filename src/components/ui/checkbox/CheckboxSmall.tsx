import React from 'react';
import { CheckboxWithStyleProps } from '@ui/UIProps';
import CheckboxStyles from './CheckboxSmall.module.scss';
import { classNames } from '@/utils/classnames';

function CheckboxSmall({ label, checked, onChange, enabled = true, title, styles = CheckboxStyles }: CheckboxWithStyleProps) {
    return (
        <label className={classNames(styles.checkbox, !enabled &&  'opacity-50')} title={title}>
            <input className={styles.input} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} disabled={!enabled} />
            <svg className={styles.icon} viewBox="0 0 22 22">
                <rect className={styles.frame} width="100%" height="100%" x=".5" y=".5" rx="3" />
                <path className={styles.tick} d="M4.7 11l5 5 9-9" />
            </svg>
            <span className={styles.text}>{label}</span>
        </label>
    );
}

export default CheckboxSmall;
