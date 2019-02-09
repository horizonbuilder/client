import * as React from 'react';
import { RouteComponentProps, Link, Switch, Route, matchPath } from 'react-router-dom';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { connect } from 'react-redux';

interface SidebarGroupProps {
    icon: string;
    name: string;
    pathname: string;
    href?: string;
    isExpanded?: boolean;
}

interface MappedStateProps {
    isExpanded?: boolean;
}

const mapStateToProps = (state: any, ownProps: SidebarGroupProps): MappedStateProps => {
    return {
        isExpanded: state.navigation.isExpanded
    };
};

export class SidebarGroup extends React.Component<SidebarGroupProps, null> {
    isRoutedToSection = (path: string): boolean => {
        const { pathname } = this.props;
        const match = matchPath(pathname, {
            path: `${path}*`,
            exact: false
        });

        return !!match && match.isExact;
    };

    render() {
        const { name, icon, href, isExpanded } = this.props;

        const comp = href === undefined ? (
            <div className={classnames(this.isRoutedToSection(href) ? styles.SidebarGroupSelected : styles.SidebarGroup, isExpanded ? styles.expanded : styles.collapsed)}>
                <div className={styles.SidebarGroupTitle}>
                    <i className={icon}></i>
                    <p>{name}</p>
                </div>
                <div className={classnames(styles.SidebarGroupItems)}>
                    {this.props.children}
                </div>
            </div>) : (
                <Link to={href} className={classnames(this.isRoutedToSection(href) ? styles.SidebarGroupSelected : styles.SidebarGroup, isExpanded ? styles.expanded : styles.collapsed)}>
                    <div className={styles.SidebarGroupTitle}>
                        <i className={icon}></i>
                        <p>{name}</p>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        {this.props.children}
                    </div>
                </Link>
            );

        return comp;
    }
}

export const ConnectedSidebarGroup = connect(
    mapStateToProps,
    null
)(SidebarGroup);
