import React from "react";

// reactstrap components
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

// core components

class PaginationComponent extends React.Component {
    state = {
        currentPage: 1,
        pages: []
    };
    changePage = page => {
        this.setState({ currentPage: page });
        this.props.onPageChange(page);
    }

    async componentDidMount() {
        this.currentPage = 1;
        const pagesCount = Math.ceil(this.props.totalItems / this.props.pageSize);
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        this.setState({ pages });
    }
    previous = async () => {
        if(this.state.currentPage === 1) {
            return;
        }
        await this.setState({ currentPage: this.state.currentPage-1 });
        this.props.onPageChange(this.state.currentPage);
    }
    
    next = async () => {
        if(this.state.currentPage === this.state.pages.length) {
            return;
        }
        await this.setState({ currentPage: this.state.currentPage+1 });
        this.props.onPageChange(this.state.currentPage);
    }
    renderPageNumbers = () => {
        return this.state.pages.map(p => {
            return (
                <PaginationItem key={p}>
                    <PaginationLink onClick={() => this.changePage(p)}>
                    {p}
                    </PaginationLink>
                </PaginationItem>
            );
        })
    }
    render () {
        return (
            <>
            <nav aria-label="...">
                <Pagination>
                <PaginationItem>
                    <PaginationLink onClick={() => this.previous()}>Previous</PaginationLink>
                </PaginationItem>
                {
                    this.renderPageNumbers()
                }
                <PaginationItem>
                    <PaginationLink onClick={() => this.next()}>
                    Next
                    </PaginationLink>
                </PaginationItem>
                </Pagination>
            </nav>
            </>
        );
    }
}
export default PaginationComponent